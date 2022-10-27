import { FontInputLabel, Input, Group } from './form-input.styles.jsx'

const FormInput = ({ label, ...otherProps }) => {

    return (
        <Group>
            <Input {...otherProps} />
            {label && (
                <FontInputLabel shrink={otherProps.value.length}>
                    {label}
                </FontInputLabel>
            )}
        </Group>
    )

}

export default FormInput;