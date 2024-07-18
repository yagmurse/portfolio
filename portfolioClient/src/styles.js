const styles = {
  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-16 py-10",

  heroHeadText:
    "font-black text-white lg:text-[40px] sm:text-[20px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2",
  heroSubText:
    "text-[#dfd9ff] font-medium lg:text-[20px] sm:text-[16px] xs:text-[20px] text-[16px] lg:leading-[40px]",

  sectionHeadText:
    "text-white font-black md:text-[50px] sm:text-[40px] xs:text-[30px] text-[20px] text-center",
  sectionSubText:
    "sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider",
  toast_custom: {
    backgroundColor: "white",
    color: "black",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    fontSize: "16px",
    padding: "50px 50px",
  },
  toast: {
    success: {
      backgroundColor: "#4caf50",
      color: "#fff",
    },
    error: {
      backgroundColor: "#f44336",
      color: "#fff",
    },
    info: {
      backgroundColor: "#2196f3",
      color: "#fff",
    },
    warning: {
      backgroundColor: "#ff9800",
      color: "#fff",
    },
  },
};

export { styles };
