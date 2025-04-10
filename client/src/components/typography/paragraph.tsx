type ParagraphProps = {
    text: string;
};

const Paragraphe = ({ text }: ParagraphProps) => {
    return (
        <p className="paragraph">
            {text}
        </p>
    )
};

export default Paragraphe;