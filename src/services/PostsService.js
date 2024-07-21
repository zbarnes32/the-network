import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"





class PostsService {
    async changePage(pageNumber) {
        const response = await api.get(`api/posts?page=${pageNumber}`)
        logger.log('Are we getting the next 20 posts?', response.data)
        const posts = response.data.posts.map(postData => new Post(postData))
        AppState.posts = posts
        AppState.currentPage = response.data.page
    }
   async getPostsByProfileId(profileId, pageNumber) {
        AppState.profilePosts = []
       const response = await api.get(`api/posts?creatorId=${profileId}&page=${pageNumber}`)
       logger.log("Able to get the specific posts by profile id", response.data)
       const posts = response.data.posts.map(postData => new Post(postData))
       AppState.profilePosts = posts
       AppState.currentPage = response.data.page
    }
    async getPosts(){
        const response = await api.get('api/posts')
        logger.log("Getting the post 📨", response.data)
        const posts = response.data.posts.map(postData => new Post(postData))
        AppState.posts = posts
        AppState.currentPage = response.data.page
    }
}

export const postsService = new PostsService()