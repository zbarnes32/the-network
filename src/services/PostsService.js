import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"





class PostsService {
   async getPostsByProfileId(profileId) {
        AppState.profilePosts = []
       const response = await api.get(`api/posts?creatorId=${profileId}`)
       logger.log("Able to get the specific posts by profile id", response.data)
       const posts = response.data.posts.map(postData => new Post(postData))
       AppState.profilePosts = posts
    }
    async getPosts(){
        const response = await api.get('api/posts')
        logger.log("Getting the post 📨", response.data)
        const posts = response.data.posts.map(postData => new Post(postData))
        AppState.posts = posts
    }
}

export const postsService = new PostsService()