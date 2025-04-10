type MainTitleProps = {
    text: string;
};

const MainTitle = ({ text }: MainTitleProps) => {
    return (
        <h1 className="mainTitle">
            {text}
        </h1>
    );
};

export default MainTitle;
