export interface ICategory {
	id?: string;
	img?: string;
	name: string;
	description?: string;
}

export interface IProduct {
	name: string
	price: number
	description: string
	id?: string
	categoryId?: string
	amount: number
	img?: string | ArrayBuffer;
}


export interface IClient {
	id?: string;
	firstName: string;
	lastName: string;
	address: string;
	phone: string;
	email?: string;
}

export interface IOrder {
	id?: string;
	products: IProduct[];
	client?: IClient;
	status: 'обрабатывается' | 'подтвержден' | 'выполнен' | 'отменен';
}

export interface IUser {
	email: string;
	password: string;
	id?: string;
}

export interface IAuthResponse {
	accessToken: string;
	user: {
	  email: string;
	  id: number;
	}
}

export interface CreateResponse {
	name?: string,
}



