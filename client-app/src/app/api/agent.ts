import axios, {AxiosError, AxiosResponse} from "axios";
import {Activity, ActivityFormValues} from "../models/activity.ts";
import {toast} from "react-toastify";
import {router} from "../router/Routes.tsx";
import {store} from "../stores/store.ts";
import {User, UserFormValues} from "../models/user.ts";
import {Photo, Profile} from "../models/Profile.ts";


export const sleep = (delay_ms: number) => {
	return new Promise(resolve => {
		setTimeout(resolve, delay_ms)
	});
}


axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async response => {
	try {
		await sleep(1000);
		return response;
	} catch (er) {
		console.log(er);
		return await Promise.reject(er);
	}
}, (error: AxiosError) => {

	const {data, status, config} = error.response as AxiosResponse;

	switch (status) {
		case 400:
			if (config.method === 'get' && Object.prototype.hasOwnProperty.call(data.errors, 'id')) {
				router.navigate('/not-found');
			}
			if (data.errors) {
				const modalStateErrors = [];
				for (const key in data.errors) {
					if (data.errors[key]) {
						modalStateErrors.push(data.errors[key]);
					}
				}
				throw modalStateErrors.flat();
			} else {
				toast.error(data);
			}
			break;

		case 401:
			toast.error("unauthorized");
			break;

		case 403:
			toast.error("forbidden");
			break;

		case 404:
			router.navigate('/not-found');
			break;

		case 500:
			store.commonStore.setServerError(data);
			router.navigate('/server-error');
			break;

	}
	return Promise.reject(error);
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data

axios.interceptors.request.use((config) => {
	const token = store.commonStore.token;
	if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
	return config;
})

const request = {
	get: <T>(url: string) => axios.get<T>(url).then(responseBody),
	post: <T>(url: string, body: object) => axios.post<T>(url, body).then(responseBody),
	put: <T>(url: string, body: object) => axios.put<T>(url, body).then(responseBody),
	delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
	list: () => request.get<Activity[]>("/activities"),
	details: (id: string) => request.get<Activity>(`/activities/${id}`),
	create: (activity: ActivityFormValues) => request.post<void>('/activities', activity),
	update: (activity: ActivityFormValues) => request.put<void>('/activities/'.concat(activity.id!), activity),
	delete: (id: string) => request.delete<void>(`/activities/${id}`),
	attend: (id: string) => request.post<void>(`/activities/${id}/attend`, {})
}

const Account = {
	current: () => request.get<User>('/account'),
	login: (user: UserFormValues) => request.post<User>('/account/login', user),
	register: (user: UserFormValues) => request.post<User>('/account/register', user),
}

const Profiles = {
	get: (username: string) => request.get<Profile>(`/profiles/${username}`),
	uploadPhoto: (file: Blob) => {
		let formData = new FormData();
		formData.append('File', file);
		return axios.post<Photo>('photos', formData,{
			headers: {"Content-Type": "multipart/form-data"},
		})
	},
	setMainPhoto: (id: string)=> request.post(`/photos/${id}/setMain`, {}),
	deletePhoto: (id: string)=> request.delete(`/photos/${id}/`),
	updateProfile: (profile: Partial<Profile>) => request.put(`/profiles`, profile),
}

export const agent = {
	Activities,
	Account,
	Profiles,
}

export default agent;