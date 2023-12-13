import { Client, ID, Storage } from "appwrite";
import config from "../config";

class FileService {
	client = new Client();
	bucket;

	constructor() {
		this.client
			.setEndpoint(config.appwriteUrl)
			.setProject(config.appwriteProjectId);
		this.bucket = new Storage(this.client);
	}

	async uploadFile(file) {
		try {
			return await this.bucket.createFile(
				config.appwriteBucketId,
				ID.unique(),
				file
			);
		} catch (error) {
			console.log("FileService :: uploadFile :: error :: ", error);
			return false;
		}
	}

	async deleteFile(fileId) {
		try {
			await this.bucket.deleteFile(config.appwriteBucketId, fileId);
			return true;
		} catch (error) {
			console.log("FileService :: deleteFile :: error :: ", error);
			return false;
		}
	}

	getFilePreview(fileId) {
		return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
	}
}

const fileService = new FileService();
export default fileService;
