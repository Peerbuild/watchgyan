'use server';

import { safeAction } from '@/lib/safeAction';
import { BlogService } from './blog.service';
import {
  createBlogRequestDto,
  createBlogResponseDto,
} from '../dto/createBlog.dto';

const blogService = new BlogService();

export const createBlog = safeAction(
  createBlogRequestDto,
  createBlogResponseDto,
  async (data) => {
    return blogService.createBlog(data);
  },
);
