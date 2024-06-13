import { Client } from "minio";

const { MINIO_ENDPOINT, MINIO_PORT, MINIO_ACCESS_KEY, MINIO_SECRET_KEY } =
	process.env;

if (!MINIO_ACCESS_KEY || !MINIO_ENDPOINT || !MINIO_PORT || !MINIO_SECRET_KEY)
	throw new Error("Missing MinIO environment variables");

const minioClient = new Client({
	endPoint: MINIO_ENDPOINT,
	port: Number.parseInt(MINIO_PORT, 10),
	useSSL: false,
	accessKey: MINIO_ACCESS_KEY,
	secretKey: MINIO_SECRET_KEY,
});

export { minioClient };
