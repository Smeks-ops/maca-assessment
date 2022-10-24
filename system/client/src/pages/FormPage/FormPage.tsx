import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import FormInput from "../../components/FormComponents/FormInput/FormInput";
import FormTextarea from "../../components/FormComponents/FormTextarea/FormTextarea";
import FormButton from "../../components/FormComponents/FormButton/FormButton";
import "./FormPage.css";

// api service
import APIService from "../../utils/apiServices";

// notify
import notify from "../../helpers/notify";

function FormPage() {
  const { register, handleSubmit, formState } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    setLoading(true);
    const data = {
      purchaseName: formData.purchaseName,
      date: formData.date,
      amount: formData.amount,
      description: formData.description,
    };

    console.log(formData);

    const newFormData = new FormData();

    Object.keys(data).forEach((key) => {
      newFormData.append(key, data[key as keyof typeof data]);
    });

    newFormData.append("file", formData.receipt[0]);

    APIService.createPurchaseEntry(newFormData)
      .then((res) => {
        setLoading(false);
        if (res.status) {
          notify("success", res.message);
        } else {
          notify("error", res.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        notify("error", "An error occured");
      });
  };

  return (
    <div className="FormPage public-page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Purchase Reimbursement Form</h3>
        <FormInput
          label="Purchased Item"
          name="purchaseName"
          type="text"
          register={register}
          formState={formState}
          rules={{
            required: "Enter purchased item",
          }}
        />
        <FormInput
          label="Date Of Purchase"
          name="date"
          type="date"
          register={register}
          formState={formState}
          rules={{
            required: "Enter Date of Purchase",
          }}
        />
        <FormInput
          label="Amount"
          name="amount"
          type="number"
          register={register}
          formState={formState}
          rules={{
            required: "Enter Amount",
          }}
        />
        <FormTextarea
          label="Description"
          name="description"
          register={register}
          formState={formState}
          rules={{
            required: "Enter Amount",
          }}
        />
        <FormInput
          label="Purchase Receipt"
          name="receipt"
          type="file"
          register={register}
          formState={formState}
          rules={{
            required: "Enter receipt",
          }}
        />
        <FormButton label="Submit" error={false} loading={loading} />
      </form>
    </div>
  );
}

export default FormPage;
