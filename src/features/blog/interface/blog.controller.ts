"use server";

import { safeAction } from "@/lib/safeAction";
import { BlogService } from "./blog.service";
import { CreateBlogRequest, createBlogRequestDto } from "../dto/createBlog.dto";
import { getBlogByIdRequestDto } from "../dto/getBlogById.dto";
import { revalidatePath } from "next/cache";
import {
  GetDraftBlogsRequest,
  getDraftBlogsRequestDto,
} from "../dto/getDraftBlog.dto";
import {
  PublishBlogRequest,
  publishBlogRequestDto,
} from "../dto/publishBlog.dto";
import { DeleteBlogRequest, deleteBlogRequestDto } from "../dto/deleteBlog.dto";
import { UpdateBlogRequest } from "../dto/updateBlog.dto";
import {
  GetRecentBlogRequest,
  getRecentBlogRequestDto,
} from "../dto/getRecentBlog.dto";

const blogService = new BlogService();

export const createBlog = safeAction(async (data: CreateBlogRequest) => {
  const newBlog = blogService.createBlog(data);
  //revalidatePath("/blog");
  //revalidatePath("/");
  return newBlog;
}, createBlogRequestDto);

export const publishBlog = safeAction(async (data: PublishBlogRequest) => {
  const publishedBlog = blogService.publishBlog(data);
  revalidatePath("/blog");
  revalidatePath("/");
  return publishedBlog;
}, publishBlogRequestDto);

export const getRecentBlogs = safeAction(
  async (data?: GetRecentBlogRequest) => {
    return blogService.getRecentBlogs(data);
  },
  getRecentBlogRequestDto,
);

export const getBlogById = safeAction(async (id: string) => {
  return blogService.getBlogById(id);
}, getBlogByIdRequestDto);

export const getTopBlogs = safeAction(async () => {
  return blogService.getTopBlogs();
});

export const getDraftBlogs = safeAction(async (data?: GetDraftBlogsRequest) => {
  return blogService.getDraftBlogs(data);
}, getDraftBlogsRequestDto);

export const updateBlog = safeAction(async (data: UpdateBlogRequest) => {
  const updatedBlog = blogService.updateBlog(data);
  revalidatePath("/");
  return updatedBlog;
});

export const deleteBlog = safeAction(async (data: DeleteBlogRequest) => {
  const blog = await blogService.deleteBlog(data);
  revalidatePath("/");
  return blog;
}, deleteBlogRequestDto);
