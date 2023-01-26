

export interface User {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export interface Item {
    _id: string
    title: string,
    description: string
    category:string
    price: string
    quantity: string
    location: string
    image: string
    date_added: Date
    seller: string
}

export interface addItemState {
    title: string,
    description: string,
    price:string,
    quantity:string,
    location:string,
    category:string,
    openAddItem: boolean
}

export interface AppState {
    items: Item[] | []
    filteredItems: Item[] | []
}

export interface CardState {
    expanded: boolean
}

export interface ProfileState {
    User: User
}

export interface wholeState {
    addItem: addItemState
    App: AppState
    Profile: ProfileState
    ItemCard: CardState
}

export interface ExpandProps {
    expand:boolean,
    onClick: () => void,
    'aria-expanded':boolean,
    'aria-label':string,
    children?: JSX.Element | JSX.Element
}

