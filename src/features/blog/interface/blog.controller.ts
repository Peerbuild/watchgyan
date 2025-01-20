'use server';

import { safeAction } from '@/lib/safeAction';
import { BlogService } from './blog.service';
import {
  CreateBlogRequest,
  createBlogRequestDto,
  createBlogResponseDto,
} from '../dto/createBlog.dto';
import { getBlogByIdRequestDto } from '../dto/getBlogById.dto';

const blogService = new BlogService();

export const createBlog = safeAction(
  async (data: CreateBlogRequest) => {
    return blogService.createBlog(data);
  },
  createBlogRequestDto,
  createBlogResponseDto,
);

export const getRecentBlogs = safeAction(async () => {
  return blogService.getRecentBlogs();
});

export const getBlogById = safeAction(async (id: string) => {
  return blogService.getBlogById(id);
}, getBlogByIdRequestDto);

export const getTopBlogs = safeAction(async () => {
  return blogService.getTopBlogs();
});
