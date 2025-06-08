type User = {
    id: string;
    name: string;
};

const users: User[] = [
    {
        id: "1",
        name: "John Doe",
    },
    {
        id: "2",
        name: "Jane Doe",
    },
];

export const getUsers = () => {
    return users;
};
