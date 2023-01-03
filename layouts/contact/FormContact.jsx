import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'yup-phone';
// import { axiosPost } from '../../apiConfig/config';
import Button from '../../components/button/Button';
import { axiosPost } from '../../pages/api/config';

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object({
	yourName: yup.string().required('Please enter your name'),
	phone: yup.string().matches(phoneRegExp, 'Please enter your phone'),
	email: yup.string().email().required('Please enter your email'),
	messText: yup.string().required('Please enter your message!'),
	term: yup
		.string()
		.oneOf(['En', 'Vn', 'Cn'], 'Please check terms and conditions')
		.required(),
});

const FormContact = ({ formText, onClick }) => {
	const { title, input, button } = formText;
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid },
		reset,
		setFocus,
		control,
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onChange',
	});

	useEffect(() => {
		setFocus('yourName');
	}, [setFocus]);

	const showToastMessage = () => {
		toast.success('The message was sent successfully!', {
			position: toast.POSITION.TOP_RIGHT,
		});
	};

	const onSubmit = async (values) => {
		if (isValid) {
			const { yourName, phone, term, email, messText } = values;
			const newValue = {
				name: yourName,
				phone: phone,
				country: term,
				email: email,
				message: messText,
			};

			await axiosPost(newValue, showToastMessage());
			reset({
				yourName: '',
				phone: '',
				email: '',
				messText: '',
				term: 'ex',
			});
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			autoComplete="off"
			className="relative px-24 py-12 page-container bg-[#222226] rounded-2xl mat:px-4 mat:py-11 mb:px-6"
		>
			<div className="absolute top-0 left-0 w-3/4 max-w-[380px] -translate-y-1/3 -translate-x-2/4 mat:-translate-y-2/4">
				<img src="/image/details-2.png" alt="" />
			</div>

			<div className="absolute top-0 left-full bg:left-[90%] bl:max-w-[190px] fl:left-[85%] w-full max-w-[200px] -translate-y-2/4">
				<img src="/image/about-4.png" alt="" />
			</div>

			<div className="absolute bottom-0 left-full bg:left-[90%] bl:max-w-[190px] fl:left-[85%] bg:translate-x-1/4 w-full max-w-[200px] translate-y-1/4 -translate-x-1/4">
				<img src="/image/contact-4.png" alt="" />
			</div>

			<h2 className="font-dancing text-[68px] text-center mb-8 mat:text-[50px] mb:text-4xl">
				{title}
			</h2>

			<div className="relative z-10 grid grid-cols-2 gap-7 mat:gap-5 mb:grid-cols-1 mb:gap-y-8">
				<div className="relative py-3 px-7 bg-[#1E1E21] border border-[#44444A] flex items-center justify-between gap-x-7 mat:gap-x-3 mat:px-5 rounded-[50px]">
					<input
						id="yourName"
						type="text"
						placeholder={input.name}
						className="w-full text-lg bg-transparent"
						{...register('yourName')}
					/>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 16 16"
						className="min-w-[16px]"
					>
						<path
							id="person"
							d="M10,10A4,4,0,1,0,6,6,4,4,0,0,0,10,10Zm2.667-4A2.667,2.667,0,1,1,10,3.333,2.667,2.667,0,0,1,12.667,6ZM18,16.667A1.306,1.306,0,0,1,16.667,18H3.333A1.306,1.306,0,0,1,2,16.667c0-1.333,1.333-5.333,8-5.333S18,15.333,18,16.667Zm-1.333-.005a3.563,3.563,0,0,0-1.109-2.219c-.869-.869-2.505-1.776-5.557-1.776s-4.688.907-5.557,1.776a3.57,3.57,0,0,0-1.109,2.219Z"
							transform="translate(-2 -2)"
							fill="#44444a"
						/>
					</svg>

					{errors?.yourName && (
						<div className="absolute mt-1 text-red-500 left-3 text-md top-full">
							{errors.yourName?.message}
						</div>
					)}
				</div>

				<div className="relative py-3 px-7 bg-[#1E1E21] border border-[#44444A] flex items-center justify-between gap-x-7 mat:gap-x-3 mat:px-5 rounded-[50px]">
					<MyInput
						type="email"
						name="email"
						id="email"
						placeholder={input.email}
						control={control}
					></MyInput>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="12"
						viewBox="0 0 16 12"
						className="min-w-[16px]"
					>
						<path
							id="envelope"
							d="M0,4A2,2,0,0,1,2,2H14a2,2,0,0,1,2,2v8a2,2,0,0,1-2,2H2a2,2,0,0,1-2-2ZM2,3A1,1,0,0,0,1,4v.217l7,4.2,7-4.2V4a1,1,0,0,0-1-1ZM15,5.383,10.292,8.208,15,11.1Zm-.034,6.876L9.326,8.788,8,9.583l-1.326-.8-5.64,3.47A1,1,0,0,0,2,13H14a1,1,0,0,0,.966-.741ZM1,11.1l4.708-2.9L1,5.383Z"
							transform="translate(0 -2)"
							fill="#44444a"
						/>
					</svg>

					{errors?.email && (
						<div className="absolute mt-1 text-red-500 left-3 text-md top-full">
							{errors.email?.message}
						</div>
					)}
				</div>

				<div className="relative py-3 px-7 bg-[#1E1E21] border border-[#44444A] flex items-center justify-between gap-x-7 mat:gap-x-3 mat:px-5 rounded-[50px]">
					<input
						type="phone"
						placeholder={input.phone}
						className="w-full text-lg bg-transparent"
						{...register('phone')}
					/>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 16 16"
						className="min-w-[16px]"
					>
						<path
							id="person"
							d="M10,10A4,4,0,1,0,6,6,4,4,0,0,0,10,10Zm2.667-4A2.667,2.667,0,1,1,10,3.333,2.667,2.667,0,0,1,12.667,6ZM18,16.667A1.306,1.306,0,0,1,16.667,18H3.333A1.306,1.306,0,0,1,2,16.667c0-1.333,1.333-5.333,8-5.333S18,15.333,18,16.667Zm-1.333-.005a3.563,3.563,0,0,0-1.109-2.219c-.869-.869-2.505-1.776-5.557-1.776s-4.688.907-5.557,1.776a3.57,3.57,0,0,0-1.109,2.219Z"
							transform="translate(-2 -2)"
							fill="#44444a"
						/>
					</svg>

					{errors?.phone && (
						<div className="absolute mt-1 text-red-500 left-3 text-md top-full">
							{errors.phone?.message}
						</div>
					)}
				</div>

				<div className="relative">
					<select
						id="term"
						className="text-[#ffffff] text-lg py-3 px-7 bg-[#1E1E21] mb:px-5 outline-none border border-[#44444A] rounded-[50px] w-full h-full appearance-none mr-4"
						{...register('term')}
					>
						<option value="ex">{input.location}</option>
						<option value="En">English</option>
						<option value="Vn">Vietnamese</option>
						<option value="Cn">Chinese</option>
					</select>

					<span className="absolute top-2/4 -translate-y-2/4 right-7">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14.121"
							height="7.811"
							viewBox="0 0 14.121 7.811"
						>
							<path
								id="chevron-left"
								d="M9,18l6-6L9,6"
								transform="translate(19.061 -7.939) rotate(90)"
								fill="none"
								stroke="#44444a"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="1.5"
							/>
						</svg>
					</span>

					{errors?.term && (
						<div className="absolute mt-1 text-red-500 left-3 text-md top-full">
							{errors.term?.message}
						</div>
					)}
				</div>

				<div className="relative col-span-2 mb:col-span-1">
					<textarea
						placeholder={input.message}
						className="py-3 pl-7 min-h-[150px] text-lg pr-11 w-full bg-[#1E1E21] border border-[#44444A] rounded-[20px]"
						id="messText"
						{...register('messText')}
					></textarea>

					<span className="absolute right-7 top-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="14.931"
							viewBox="0 0 16 14.931"
						>
							<path
								id="chat"
								d="M2.678,11.894a1,1,0,0,1,.287.8,10.97,10.97,0,0,1-.4,2A11.809,11.809,0,0,0,5.2,13.8a1,1,0,0,1,.71-.074A8.06,8.06,0,0,0,8,14c4,0,7-2.807,7-6S12,2,8,2,1,4.808,1,8A5.5,5.5,0,0,0,2.678,11.894Zm-.493,3.9q-.355.07-.713.129a.26.26,0,0,1-.273-.362q.133-.314.244-.637l0-.01A10.445,10.445,0,0,0,1.97,12.6,6.5,6.5,0,0,1,0,8C0,4.134,3.582,1,8,1s8,3.134,8,7-3.582,7-8,7a9.06,9.06,0,0,1-2.347-.306A13.669,13.669,0,0,1,2.185,15.8Z"
								transform="translate(0 -1)"
								fill="#44444a"
							/>
						</svg>
					</span>

					{errors?.messText && (
						<div className="absolute mt-1 text-red-500 left-3 text-md top-full">
							{errors.messText?.message}
						</div>
					)}
				</div>
			</div>

			<Button className="block mx-auto mt-14" type="submit" onClick={onClick}>
				{isSubmitting ? (
					<div className="w-5 h-5 mx-auto border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
				) : (
					button
				)}
			</Button>
			<ToastContainer />
		</form>
	);
};

// useController
const MyInput = ({ control, ...props }) => {
	const { field } = useController({
		name: props.name,
		control,
		defaultValue: '',
	});

	return (
		<input className="w-full text-lg bg-transparent" {...field} {...props} />
	);
};

export default FormContact;
