import { appConfig } from '@configs/app.config';
import { callApi } from '@utils/api-request';
import { MailContentId } from '@app/utils/types';
import { ADMIN_BACKEND_ROUTE } from '@utils/constants';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'x-api-key': appConfig().ADMIN_BACKEND_API_KEY,
};

export async function getMethodToAdminBackend({ url }: { url: string }) {
  const response = await callApi({
    method: 'GET',
    url,
    headers: headers,
  });
  return response?.data;
}

export async function patchMethodToAdminBackend({
  url,
  data,
}: {
  url: string;
  data: any;
}) {
  const response = await callApi({
    method: 'PATCH',
    url,
    headers: headers,
    data: data,
  });
  return response?.data;
}
