export const handerData = (data) => {
  let array = data.map((el) => {
    let relaship = el.relationships.map((el) =>
      el.type === "manga" ? el.id : ""
    );
    let id = relaship.join("");
    return {
      id,
      fileName: el.attributes.fileName,
    };
  });
  return array;
};
