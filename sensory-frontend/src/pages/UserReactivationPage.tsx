const Reactivation = () => {

  return (
    <div>
      <h5 style={{ textAlign: "center", marginTop: "50px" }}>
        Your account has been successfully verified!
        <br />
        Click <a href={"/login"} style={{ color: 'blue' }}> here </a>
        to login.
      </h5>
    </div>
  );
};

export default Reactivation;

// style={{backgroundColor: '#eeeeee', width: '8000px', textAlign: 'center', display:'flex', alignItems: 'center'}}
