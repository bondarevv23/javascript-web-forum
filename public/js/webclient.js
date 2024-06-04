const host = "https://fishka-pr-7.onrender.com"
// const host = "http://localhost:3000"
// const namesapce = "http://localhost:3000/comment"
const namesapce = "https://fishka-pr-7.onrender.com/comment"
$(document).ready(function () {
    var limit = 5;
    var offset = 0;
    if (window.location.pathname.startsWith('/index')) {
        loadIndexPosts();
    }

    $("#load-more-btn").click(function () {
        if (window.location.pathname.startsWith('/index')) {
            loadIndexPosts();
        }
        if (window.location.pathname.startsWith('/post-page/')) {
            loadComments();
        }
    });


    function loadIndexPosts() {
        $.ajax({
            url: host + '/posts',
            type: 'GET',
            data: {limit: limit, offset: offset},
            success: function (data) {
                console.log(data);
                if (data.length > 0) {
                    offset += limit;
                } else {
                    $("#load-more-btn").hide();
                }
                data.forEach(function (post) {
                    var tagsHTML = "";

                    post.tags.forEach(function (tag) {
                        tagsHTML += '<li class="articles__item-tag">' + tag + '</li>';
                    });

                    var imgsHTML = "";

                    post.photosUrls.forEach(function (photo) {
                        imgsHTML += `<img class="articles__item-images-img" src="${photo.url}"
                                                    alt="${photo.url}">`
                    });

                    $("section.articles").append(`
            <article class="articles__item">
                <div class="articles__top"><h2 class="articles__item-heading"><a class="articles__item-header" href="/post-page/${post.id}">${post.title}</a></h2>
                    <div class="articles__item-info"><a class="articles__item-author"
                                                            href="/user-page/${post.author.id}">${post.author.name}</a>
                        <time class="articles__item-date" datetime="${post.creationDate}"> ${convertDateToTime(post.creationDate)}</time>
                        <ul class="articles__item-tags">
                            ${tagsHTML}
                        </ul>
                    </div>
                    <h3 class="articles__item-subheading">${post.subTitle}</h3></div>
                <div className="articles__item-text"><p class="articles__item-content-paragraph">${post.content}</p>
                </div>
                <div className="articles__item-images">
                ${imgsHTML}
                </div>
            </article>
        `)
                })

            },
            error: function () {
                $("#load-more-btn").hide();
            }
        });
    }

    $('#register-form').submit(function (event) {
        event.preventDefault();


        var formData = {
            name: $('#name').val(),
            surname: $('#surname').val(),
            email: $('#email').val(),
            password: $('#password').val()
        };
        sendRegister(formData)


    });

    function sendRegister(formData) {
        $.ajax({
            type: 'POST',
            url: host + '/auth/register',
            data: formData,
            success: function (data) {
                console.log('Успешно отправлено:', data);
                localStorage.setItem('currentUser', JSON.stringify(data.user));
                localStorage.setItem('accessToken', data.accessToken);
                window.location.href = host + '/index'
            },
            error: function (xhr, status, error) {
                console.error('Ошибка при отправке:', error);
                $('.error_message').text('Ошибка при отправке формы: ' + error).show();
            }
        });
    }

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    function renderUserMenu() {
        console.log("USER" + currentUser);
        var $userMenu = $('.header__user-menu');
        $userMenu.empty();

        if (currentUser) {
            $userMenu.append(`
                <li class="header__user-menu-item">
                    <a class="header__user-menu-link" href="/logout">Выйти</a>
                </li>
                <li class="header__user-menu-item">
                    <a class="header__user-menu-link" href="/user-page/${currentUser.id}">${currentUser.name}</a>
                </li>
            `);
        } else {
            $userMenu.append(`
                <li class="header__user-menu-item">
                    <a class="header__user-menu-link" href="/login">Войти</a>
                </li>
                <li class="header__user-menu-item">
                    <a class="header__user-menu-link" href="/register">Зарегистрироваться</a>
                </li>
            `);
        }
    }

    renderUserMenu();

    $('a[href="/logout"]').click(function (event) {
        event.preventDefault();

        $.ajax({
            url: host + '/auth/logout',
            type: 'POST',
            success: function (response) {
                console.log(response);
                localStorage.removeItem('currentUser');
                localStorage.removeItem('accessToken');
                window.location.href = host + '/index';
            },
            error: function (error) {
                console.error('Произошла ошибка при выходе из системы:', error);
            }
        });
    });

    $('#login-form').submit(function (event) {
        event.preventDefault();
        var formData = {
            email: $('#email').val(),
            password: $('#password').val()
        };
        $.ajax({
            type: 'POST',
            url: '/auth/login',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function (data) {
                console.log('Успешно вошли:', data);
                localStorage.setItem('currentUser', JSON.stringify(data.user));
                localStorage.setItem('accessToken', data.accessToken);
                window.location.href = host + '/index'
            },
            error: function (xhr, status, error) {
                console.error('Ошибка при входе:', error);
                console.error('Ошибка при входе:', xhr);
                console.error('Ошибка при входе:', status);
                $('.error_message').text('Ошибка при входе: ' + xhr.responseJSON.message).show();
            }
        });
    });
    $('#post-form').submit(function (event) {
        var file = $('#photo')[0].files[0];

        event.preventDefault();
        var curUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!curUser) {
            $('.error_message').text('Авторизуйтесь!').show();
            return;
        }
        var tagsInput = $('#tags').val();

        var tagsArray = tagsInput.split(' ');
        if (file) {
            var form = new FormData();
            form.append("image", file)


            $.ajax({
                url: 'https://api.imgbb.com/1/upload?key=3e7a5d93502894e501a9329f92149128',
                type: 'POST',
                data: form,
                mimeType: 'multipart/form-data',
                contentType: false,
                processData: false,
                success: function (response) {
                    console.log(response)
                    jsonResponse = JSON.parse(response);
                    console.log('Изображение успешно загружено:', jsonResponse.data.url);
                    var formData = {
                        title: $('#title').val(),
                        subTitle: $('#subTitle').val(),
                        content: $('#content').val(),
                        authorId: curUser.id,
                        photosUrls: jsonResponse.data.url,
                        tags: tagsArray
                    };
                    $.ajax({
                        type: 'POST',
                        url: '/posts',

                        data: JSON.stringify(formData),
                        contentType: 'application/json',
                        success: function (data) {
                            console.log('Пост успешно создан:', data);
                            window.location.href = host + '/index'
                        },
                        error: function (xhr, status, error) {
                            console.error('Ошибка при создании поста:', error);
                            $('.error_message').text('Ошибка при создании поста: ' + xhr.responseJSON.message).show();

                        }
                    });
                },
                error: function (xhr, status, error) {
                    console.error('Произошла ошибка при загрузке изображения:', error);
                }
            });
        } else {
            var formData = {
                title: $('#title').val(),
                subTitle: $('#subTitle').val(),
                content: $('#content').val(),
                authorId: curUser.id,
                tags: tagsArray
            };
            $.ajax({
                type: 'POST',
                url: '/posts',
                data: JSON.stringify(formData),
                contentType: 'application/json',
                success: function (data) {
                    console.log('Пост успешно создан:', data);
                    window.location.href = host + '/index'
                },
                error: function (xhr, status, error) {
                    console.error('Ошибка при создании поста:', error);
                    $('.error_message').text('Ошибка при создании поста: ' + xhr.responseJSON.message).show();

                }
            });
        }

    });
    if (window.location.pathname.startsWith('/post-page/')) {
        if (!currentUser) {
            $('#commentForm').hide();
        }
        var postId = window.location.pathname.split('/').pop();
        $.ajax({
            type: 'GET',
            url: host + `/posts/post/${postId}`,
            success: function (post) {
                var tagsHTML = "";

                post.tags.forEach(function (tag) {
                    tagsHTML += '<li class="articles__item-tag">' + tag + '</li>';
                });

                var imgsHTML = "";

                post.photosUrls.forEach(function (photo) {
                    imgsHTML += `<img class="articles__item-images-img" src="${photo.url}"
                                                    alt="${photo.url}">`
                });
                console.log(imgsHTML);

                $("section.articles").append(`
            <article class="articles__item">
                <div class="articles__top"><h2 class="articles__item-heading"><a  class="articles__item-header" href="/post-page/${post.id}">${post.title}</a></h2>
                    <div class="articles__item-info"><a class="articles__item-author"
                                                            href="/user-page/${post.author.id}">${post.author.name}</a>
                        <time class="articles__item-date" datetime="${post.creationDate}"> ${convertDateToTime(post.creationDate)}</time>
                        <ul class="articles__item-tags">
                            ${tagsHTML}
                        </ul>
                    </div>
                    <h3 class="articles__item-subheading">${post.subTitle}</h3></div>
                <div class="articles__item-text"><p class="articles__item-content-paragraph">${post.content}</p>
                </div>
                <div class="articles__item-images">
                ${imgsHTML}
                </div>
            </article>`);
            },
            error: function (xhr, status, error) {
                console.error('Ошибка при получении списка статей:', error);
            }

        });
        loadComments()

        function loadComments() {
            $.ajax({
                type: 'GET',
                url: host + '/comments/post/' + postId,
                success: function (comments) {
                    comments.sort(function (a, b) {
                        var dateA = new Date(a.creationDate);
                        var dateB = new Date(b.creationDate);
                        return dateB - dateA;
                    }).forEach(function (comment) {
                        $(".comments").append(`        <div class="comment">
            <div class="comment-author"><span class="comment-author-name"><a class="articles__item-author" href="/user-page/${comment.author.id}">${comment.author.name}</a></span>
                <time class="comment-date" datetime="${comment.creationDate}">${convertDateToTime(comment.creationDate)}</time>
            </div>
            <p class="comment-content">${comment.text}</p></div>`)
                    })
                },
                error: function (err) {
                    console.error('Произошла ошибка при загрузке комментариев:', err);
                }
            });
        }
    }
    if (window.location.pathname.startsWith('/user-page/')) {
        var userId = window.location.pathname.split('/').pop();
        console.log("userId" + userId);
        console.log("currentUser" + currentUser);
        console.log("currentUserId" + currentUser.id);
        if (userId == currentUser.id) {
            $('#post-form').show();
        }
        $.ajax({
            type: 'GET',
            url: host + `/posts/author/${userId}`,
            success: function (data) {
                console.log('Список статей пользователя:', data);
            },
            error: function (xhr, status, error) {
                console.error('Ошибка при получении списка статей:', error);
            }
        });

        $.get(host + `/posts/author/${userId}`, function (data) {
            console.log(data)
            data.forEach(function (post) {
                var tagsHTML = "";

                post.tags.forEach(function (tag) {
                    tagsHTML += '<li class="articles__item-tag">' + tag + '</li>';
                });

                var imgsHTML = "";

                post.photosUrls.forEach(function (photo) {
                    imgsHTML += `<img class="articles__item-images-img" src="${photo.url}"
                                                    alt="${photo.url}">`
                });

                $("section.articles").append(`
            <article class="articles__item" data-post-id="${post.id}">
                <div class="articles__top"><h2 class="articles__item-heading"><a  class="articles__item-header" href="/post-page/${post.id}">${post.title}</a></h2>
                    <div class="articles__item-info"><a class="articles__item-author"
                                                            href="/user-page/${post.author.id}">${post.author.name}</a>
                        <time class="articles__item-date" datetime="${post.creationDate}"> ${convertDateToTime(post.creationDate)}</time>
                        <ul class="articles__item-tags">
                            ${tagsHTML}
                        </ul>
                    </div>
                    <h3 class="articles__item-subheading">${post.subTitle}</h3></div>
                <div className="articles__item-text"><p class="articles__item-content-paragraph">${post.content}</p>
                </div>
                <div className="articles__item-images">
                ${imgsHTML}
                </div>
                <button class="delete-post">Удалить</button>
            </article>
        `)
                if (userId == currentUser.id) {
                    $('.delete-post').show();
                } else {
                    $('.delete-post').hide();
                }
            })

        });
    }

    $('#commentForm').submit(function (event) {
        event.preventDefault();
        var postId = window.location.pathname.split('/').pop();
        var userId = currentUser.id;
        var formData = {
            authorId: userId,
            postId: postId,
            text: $('textarea[name="comment"]').val()
        };
        $.ajax({
            type: 'POST',
            url: host + '/comments',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function (response) {
                console.log('Комментарий успешно добавлен:', response);
                // window.location.href = host + '/post-page/' + postId;
                socket.emit('addComment', JSON.stringify(response));
                $('textarea[name="comment"]').val('');
            },
            error: function (err) {
                console.error('Произошла ошибка при добавлении комментария:', err);
            }
        });
    });

})

function convertDateToTime(dateString) {
    var date = new Date(dateString);
    return date.toLocaleDateString(window.navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

}

$(document).on('click', '.delete-post', function () {
    var postId = $(this).closest('.articles__item').data('post-id');
    alert(postId);
    $.ajax({
        type: 'DELETE',
        url: host + '/posts/' + postId,
        success: function (response) {
            console.log('Пост успешно удален:', response);
            alert("post deleted")
            window.location.href = host + '/index'
        },
        error: function (err) {
            console.error('Произошла ошибка при удалении поста:', err);
        }
    });
});

if (window.location.pathname.startsWith('/post-page/')) {
    var postId = window.location.pathname.split('/').pop();
    var socket = io(namesapce)

    socket.on('connect', () => {
        console.log('Подключение к серверу установлено');
    });

    socket.on('onComments', (message) => {
        console.log('Получено сообщение:', message);
    });

    socket.on('disconnect', () => {
        console.log('Подключение к серверу разорвано');
    });

    socket.emit('joinRoom', JSON.stringify({postId: postId}));

    socket.on('newComment', function (comment) {
        console.log(comment)
        comment = JSON.parse(comment)
        $(".comments").prepend(`
        <div class="comment">
            <div class="comment-author">
                <span class="comment-author-name">
                    <a class="articles__item-author" href="/user-page/${comment.author.id}">${comment.author.name}</a>
                </span>
                <time class="comment-date" datetime="${comment.creationDate}">${convertDateToTime(comment.creationDate)}</time>
            </div>
            <p class="comment-content">${comment.text}</p>
        </div>
    `);
    });
}


function onTelegramAuth(user) {
    alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
    sendRegister({
        name: user.first_name,
        surname: user.first_name,
        email: user.last_name,
        password: user.username
    })
}
