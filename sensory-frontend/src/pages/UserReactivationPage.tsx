const Reactivation = () => {
  const handleSubmit = () => {};

  return (
    <div>
      <h5 style={{ textAlign: "center", marginTop: "50px" }}>
        Your account is deactivated.
        <br />
        Click <button onClick={handleSubmit}>here</button>
        to reactivate your account.
      </h5>
    </div>
  );
};

export default Reactivation;

// style={{backgroundColor: '#eeeeee', width: '8000px', textAlign: 'center', display:'flex', alignItems: 'center'}}
