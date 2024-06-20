import { minioClient } from "../configs/minIOClient";

const saveUpdateObject = async (
	bucketName: string,
	objectName: string,
	catalogJSON: string,
) => {
	return await minioClient.putObject(
		bucketName,
		objectName,
		Buffer.from(catalogJSON)
	);
};

export { saveUpdateObject };
