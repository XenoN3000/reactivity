import {Profile} from "./Profile.ts";

export type IActivity = {
	id: string
	title: string
	date: Date | null
	description: string
	category: string
	city: string
	venue: string
	hostUsername: string
	isCancelled: boolean
	isGoing: boolean
	isHost: boolean
	host?: Profile
	attendees: Profile[]
}


export class Activity implements IActivity {
	constructor(init?: ActivityFormValues) {
		// @ts-ignore
		this.id = init.id;

		// @ts-ignore
		this.title = init.title;

		// @ts-ignore
		this.date = init.date;

		// @ts-ignore
		this.description = init.description;

		// @ts-ignore
		this.category = init.category;

		// @ts-ignore
		this.city = init.city;

		// @ts-ignore
		this.venue = init.venue;

	}


	id: string
	title: string
	date: Date | null
	description: string
	category: string
	city: string
	venue: string
	hostUsername: string = ''
	isCancelled: boolean = false
	isGoing: boolean = false
	isHost: boolean = false
	host?: Profile
	attendees: Profile[] = []
}


export class ActivityFormValues {
	id?: string = undefined;
	title: string = '';
	category: string = '';
	description: string = '';
	date: Date | null = null;
	city: string = '';
	venue: string = '';

	constructor(activity?: ActivityFormValues) {
		if (activity) {
			this.id = activity.id;
			this.title = activity.title;
			this.category = activity.category;
			this.description = activity.description;
			this.date = activity.date;
			this.city = activity.city;
			this.venue = activity.venue;
		}
	}
}