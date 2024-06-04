import {Prisma} from "@prisma/client";
import {UserResponseDto} from "../dto/user-response.dto";

export class UserMapper {
    public static toUser(user) {
        return new UserResponseDto(
            user.id,
            user.name,
            user.surname,
            user.email
        )
    }
}