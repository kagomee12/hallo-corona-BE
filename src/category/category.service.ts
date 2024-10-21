import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      const categories = await this.prisma.category.findMany({
        include: {
          articles: true,
        },
      });
      return {
        status: 'success',
        message: 'Categories retrieved successfully',
        data: categories,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to retrieve categories',
        error: error.message,
      };
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.prisma.category.findUnique({
        where: { id },
        include: { articles: true },
      });
      if (!category) {
        return {
          status: 'error',
          message: `Category with ID ${id} not found`,
        };
      }
      return {
        status: 'success',
        message: 'Category retrieved successfully',
        data: category,
      };
    } catch (error) {
      return {
        status: 'error',
        message: `Failed to retrieve category with ID ${id}`,
        error: error.message,
      };
    }
  }
}
