import emailjs from "@emailjs/browser";

const ActivateAccount = () => {
  const sendEmail = async (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_zvndk1m",
        "template_mxpn6n9",
        e.target,
        "AU_WL4qpXwe7jrxk_"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    alert("Kindly check your email to verify your account.");
    e.target.reset();
  };

  return (
    <form onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};

export default ActivateAccount;
