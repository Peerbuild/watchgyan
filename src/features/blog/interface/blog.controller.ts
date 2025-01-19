'use server';

import { safeAction } from '@/lib/safeAction';
import { BlogService } from './blog.service';
import {
  CreateBlogRequest,
  createBlogRequestDto,
  createBlogResponseDto,
} from '../dto/createBlog.dto';

const blogService = new BlogService();

export const createBlog = safeAction(
  async (data: CreateBlogRequest) => {
    return blogService.createBlog(data);
  },
  createBlogResponseDto,
  createBlogRequestDto,
);
