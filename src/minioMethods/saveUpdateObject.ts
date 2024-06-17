import { minioClient } from "../configs/minIOClient";

const saveUpdateObject = async (
	bucketName: string,
	objectName: string,
	catalogJSON: string,
) => {
	return await minioClient.putObject(
		bucketName,
		objectName,
		Buffer.from(catalogJSON),
		(err: any, etag: any) => {
			if (err) throw new Error(err);

			console.log("Catalog JSON saved or updated at MinIO", etag);
		},
	);
};

export { saveUpdateObject };
