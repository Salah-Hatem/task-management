import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';
import { Prisma } from '@prisma/client';
import { scrapeLinkedInProfile } from 'utils/linkedInScraper';

@Injectable()
export class UserService {
  async findAll() {
    return await this.prisma.user.findMany();
  }
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    const { password, ...user } = createUserDto;
    const hashedPassword = await hash(password);
    const profileUrl = createUserDto.linkedinUrl;

    try {
      const newUser = await this.prisma.user.create({
        data: {
          password: hashedPassword,
          linkedinUrl: createUserDto.linkedinUrl,
          ...user,
        },
      });
      // Call updateUserWithLinkedInData, without impacting user creation
      this.updateUserWithLinkedInData(newUser.id, profileUrl).catch((error) => {
        console.error(
          `Failed to scrape and update LinkedIn data for user ${newUser.id}:`,
          error,
        );
      });
      return newUser;
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  }

  async updateUserWithLinkedInData(userId: string, profileUrl: string) {
    try {
      const { name, imageUrl } = await scrapeLinkedInProfile(profileUrl);

      // Update the user with LinkedIn data
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          linkedinName: name,
          linkedinImage: imageUrl,
        },
      });

      console.log(`User ${userId} updated with LinkedIn data`);
    } catch (error) {
      console.error(
        `Failed to scrape LinkedIn profile for user ${userId}:`,
        error,
      );
    }
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        password: false,
        name: true,
        linkedinImage: true,
        linkedinName: true,
        linkedinUrl: true,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
