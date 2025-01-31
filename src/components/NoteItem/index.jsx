import { Container } from "./style";
import { FiPlus, FiX } from "react-icons/fi"

export function NoteItem({ isNew, value, onClick, ...rest }) {
    return (
        <Container {...rest}>
            <input 
                type="text"
                value={value}
                readOnly={!isNew}
                {...rest}
            />

            <button 
                type="button" 
                onClick={onClick}
                className={isNew ? 'button-add' : 'button-delete'}
            >
                {isNew ? <FiPlus /> : <FiX />}
            </button>

        </Container>
    )
}