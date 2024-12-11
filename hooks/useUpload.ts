import { useMutation } from '@tanstack/react-query';
import { graphqlClient } from '../client/app';

interface GetSignedUrlInput {
  fileType: string;
  fileName: string;
}

interface SignedUrlResponse {
  getSignedUrl: string;
}

export const useGetSignedUrl = () => {
  return useMutation<string, Error, GetSignedUrlInput>({
    mutationFn: async (input) => {
      const query = `
        query GetSignedUrl($fileType: String!, $fileName: String!) {
          getSignedUrl(fileType: $fileType, fileName: $fileName)
        }
      `;
      const response = await graphqlClient.request<SignedUrlResponse>(query, input);
      return response.getSignedUrl;
    }
  });
};

interface UploadFileInput {
  file: File;
  fileName: string;
}

export const useUploadFile = () => {
  const getSignedUrlMutation = useGetSignedUrl();

  return useMutation<string, Error, UploadFileInput>({
    mutationFn: async ({ file, fileName }) => {
      try {
        // Get signed URL
        const signedUrl = await getSignedUrlMutation.mutateAsync({
          fileType: file.type,
          fileName,
        });

        // Upload file to S3
        const response = await fetch(signedUrl, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to upload file to S3');
        }

        return signedUrl.split('?')[0]; // Return the file URL without the signed parameters
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to upload file');
      }
    }
  });
};