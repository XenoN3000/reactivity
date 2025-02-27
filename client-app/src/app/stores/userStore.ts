import {User, UserFormValues} from "../models/user.ts";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent.ts";
import {store} from "./store.ts";
import {router} from "../router/Routes.tsx";

export default class UserStore {
	user: User | null = null;


	constructor() {
		makeAutoObservable(this)
	}


	get isLoggedIn() {
		return !!this.user;
	}

	login = async (creds: UserFormValues) => {
		try {
			const user = await agent.Account.login(creds);
			store.commonStore.setToken(user.token)
			runInAction(() => {
				this.user = user
				router.navigate('/activities')

			})
			store.modalStore.closeModal();
			console.log(user);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}


	register = async (creds: UserFormValues) => {
		try {
			const user = await agent.Account.register(creds);
			store.commonStore.setToken(user.token)
			runInAction(() => {
				this.user = user
			})
			router.navigate('/activities');
			store.modalStore.closeModal();
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	logout = () => {
		store.commonStore.setToken(null);
		localStorage.removeItem("jwt");
		this.user = null;
		router.navigate('/');
		store.modalStore.closeModal();

	}

	getUser = async () => {
		try {
			const user = await agent.Account.current();
			runInAction(() => {
				this.user = user
			})
		} catch (error) {
			console.log(error);
		}
	}

	setImage = (image: string) => {
		if (this.user)
			this.user.image = image;
	}


	setDisplayName = (displayName: string) => {
		if (this.user) this.user.displayName = displayName;
	}
}