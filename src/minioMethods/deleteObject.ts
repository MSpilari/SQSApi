import { minioClient } from "../configs/minIOClient";

const deleteObject = async (bucketName: string, objectName: string) => {
	await minioClient.removeObject(bucketName, objectName);
};

export { deleteObject };
