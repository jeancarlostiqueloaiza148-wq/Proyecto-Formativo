type PropsTitle = {
    name: string;
    style: string;
    identificador?: string;
}



export default function Title(props:PropsTitle) {
    return (
        <>
        <h1 className={`${props.style} text-3xl font-bold mb-4`}>{props.name}</h1>
        </>
    );
}