import { CreateUserUseCase } from "../domain/use-cases/user/create-user/create-user.use-case";
import { UpdateUserUseCase } from "../domain/use-cases/user/update-user/update-user.use-case";
import { VerifyUserEmailUseCase } from "../domain/use-cases/user/verify-email/verify-email.use-case";
import { NodemailerEmailConfiguration } from "../infra/email/nodemailer-email.config";
import { UserRepositoryPrisma } from "../infra/repositories/prisma.user-repository";
import { BcryptAdapter } from "../services/bcrypt-adapter";
import { JWTAdapter } from "../services/jwt-adapter";
import { IdGenerator } from "../services/id-generator";
import { AuthenticateUserUseCase } from "../domain/use-cases/user/authenticate-user/authenticate-user.use-case";
import { CreateChurchUseCase } from "../domain/use-cases/church/create-church/create-church.use-case";
import { ChurchRepositoryPrisma } from "../infra/repositories/prisma.church-repository";

export async function bootstrap() {
    const userRepo = new UserRepositoryPrisma();
    const churchRepo = new ChurchRepositoryPrisma();
    const jwtToken = new JWTAdapter();
    const encryption = new BcryptAdapter();
    const idGenerator = new IdGenerator();
    const emailService = new NodemailerEmailConfiguration();
    await emailService.init();


    const createUserUseCase = new CreateUserUseCase(
        userRepo,
        jwtToken,
        emailService,
        encryption,
        idGenerator
    );

    const updateUserUseCase = new UpdateUserUseCase(userRepo);
    const verifyEmailUseCase = new VerifyUserEmailUseCase(userRepo, jwtToken);
    const authenticateUserUseCase = new AuthenticateUserUseCase(userRepo, encryption, jwtToken);
    const createChurchUseCase = new CreateChurchUseCase(churchRepo, userRepo);

    return {
        userRepo,
        jwtToken,
        encryption,
        idGenerator,
        emailService,
        createUserUseCase,
        updateUserUseCase,
        verifyEmailUseCase,
        authenticateUserUseCase,
        createChurchUseCase
    };
}
