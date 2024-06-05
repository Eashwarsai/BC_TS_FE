export const PostEventToSlack = async (url,data) =>{
    const response = await fetch(`${url}`, {
        method: "POST",
        body: JSON.stringify({ text: `${data.message}` }),
      });
      return response;
}