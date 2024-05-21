export const Section = ({ title, text, additionalText }: any) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-lg mb-6">{text}</p>
      {additionalText ? <p className="text-lg mb-6">{additionalText}</p> : null}
    </>
  );
};
