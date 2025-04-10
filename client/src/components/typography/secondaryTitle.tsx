type SecondaryTitleProps = {
    text: string;
};

const SecondaryTitle = ({ text }: SecondaryTitleProps) => {
    return (
        <h1 className="secondaryTitle">
            {text}
        </h1>
    );
};

export default SecondaryTitle;