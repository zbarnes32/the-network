import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"





class PostsService {
    async likePost(isPostLiked) {
        // FIXME send a post request to /api/posts/:id/like, make your you interpolate the id of the post you want to like, there is no request body necessary
        const response = await api.put('api/posts', isPostLiked)
    }

    async destroyPost(postId) {
        const response = await api.delete(`api/posts/${postId}`)
        logger.log('Going to delete', postId)
        const postIndex = AppState.posts.findIndex(post => post.id == postId)
        if (postIndex == -1) throw new Error("Unable to delete!")
        AppState.posts.splice(postIndex, 1)
    }
    async createPost(postData) {
        const response = await api.post('api/posts', postData)
        logger.log("created post ✅", response.data)
        const newPost = new Post(response.data)
        AppState.posts.unshift(newPost)
    }
    async searchPosts(searchTerm) {
        // NOTE we are passing the search term as body here, we need to interpolate it into the url /api/posts?query=*query*
        const response = await api.get(`api/posts`, searchTerm)
        logger.log('Did the search work?', response.data)
        const postsBySearch = response.data.posts.map(searchData => new Post(searchData))
        AppState.searchingPosts = postsBySearch
    }
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
    async getPosts() {
        const response = await api.get('api/posts')
        logger.log("Getting the post 📨", response.data)
        const posts = response.data.posts.map(postData => new Post(postData))
        AppState.posts = posts
        AppState.currentPage = response.data.page
    }
}

export const postsService = new PostsService()