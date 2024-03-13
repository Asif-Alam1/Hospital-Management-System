import { Injectable } from '@nestjs/common';

@Injectable()
<<<<<<< Updated upstream
export class AuthService {}
=======
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(data: { id: string; Password: string }): Promise<any> {
    const { id, Password } = data;

    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }


    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { id: user.id };
    return this.jwtService.sign(payload);
  }

  async register(data: Prisma.UserCreateInput): Promise<User> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(data.Password, saltOrRounds);
    data.Password = hash;

    return this.prisma.user.create({ data });
  }

  async logout() {
    return null;
  }
}
>>>>>>> Stashed changes
