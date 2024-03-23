import "./FormTemplate.css";

type Props = {
  children: React.ReactNode;
  formContainer: string;
};

function FormTemplate({ children, formContainer }: Props) {
  return <div className={formContainer}>{children}</div>;
}

export default FormTemplate;
