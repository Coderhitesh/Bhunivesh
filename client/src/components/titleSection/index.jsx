const TitleSection = ({ titleSectionData, sectionClasses, headingClasses }) => {
  return (
    <>
      <div style={{display:'flex',flexDirection:'column', alignItems:'center'}} className={`section-title-area ${sectionClasses}`}>
        <h6
          className={`section-subtitle ${headingClasses} ltn__secondary-color`}
        >
          {titleSectionData.subTitle}
        </h6>
        <h1 className="section-title"> {titleSectionData.title}</h1>
      </div>
    </>
  );
};

export default TitleSection;
