import PasswordChecklist from "react-password-checklist"

const Checklist = ({password, passwordAgain}) =>{

    

    return(
        <PasswordChecklist
            className="checkList"
            rules={["minLength","specialChar","number","capital","match"]}
            minLength={8}
            value={password}
            valueAgain={passwordAgain}
            validColor = {"rgba(40, 224, 90)"}
            invalidColor ={"rgba(255, 73, 73)"}

            messages={{
			minLength: "Пароль содержит минимум 8 символов",
			specialChar: "Пароль содержит специальные символы",
			number: "Пароль содержит номер",
			capital: "Пароль содержит хотя бы одну заглавную букву",
			match: "Пароли совпадают",
				}}
        />
    )
}

export {Checklist}

