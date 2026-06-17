import React, { useState } from "react";

export default function RecuperarPassword() {
	const [email, setEmail] = useState("");
	const [mensaje, setMensaje] = useState("");
	const [loading, setLoading] = useState(false);
	const [seconds, setSeconds] = useState(0);
	const [countdownActive, setCountdownActive] = useState(false);
	const [intervalId, setIntervalId] = useState(null);

	const recuperarPassword = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);

			const response = await fetch(
				`https://backend-donde-la-andrea.onrender.com/usuarios/recuperar?email=${email}`,
				{
					method: "POST",
				}
			);

			const data = await response.text();

			if (!response.ok) {
				throw new Error(data);
			}

			setMensaje(
				`Token generado correctamente. Copia este token para el siguiente paso: ${data}`
			);
			// iniciar contador de 10 segundos y redirigir cuando llegue a 0
			setSeconds(10);
			setCountdownActive(true);
			const id = setInterval(() => {
				setSeconds((s) => {
					if (s <= 1) {
						clearInterval(id);
						window.location.href = `#/reset-password?token=${data}`;
						return 0;
					}
					return s - 1;
				});
			}, 1000);
			setIntervalId(id);
		} catch (error) {
			setMensaje(error.message);
		} finally {
			setLoading(false);
		}
	};

	// limpiar intervalo si el componente se desmonta
	React.useEffect(() => {
		return () => {
			if (intervalId) clearInterval(intervalId);
		};
	}, [intervalId]);

	return (
		<div className="container mt-5">
			<div className="card p-4 mx-auto" style={{ maxWidth: "500px" }}>
				<h2 className="text-center mb-4">Recuperar Contraseña</h2>

				<form onSubmit={recuperarPassword}>
					<div className="mb-3">
						<label className="form-label">Correo Electrónico</label>
						<input
							type="email"
							className="form-control"
							placeholder="correo@gmail.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<button
						className="btn w-100 text-white"
						style={{ backgroundColor: "#198754", borderColor: "#198754" }}
						disabled={loading}
					>
						{loading ? "Generando..." : "Recuperar Contraseña"}
					</button>
				</form>

				{mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
				{countdownActive && (
					<div className="alert alert-secondary mt-2">
						Redirigiendo en {seconds} segundo{seconds !== 1 ? "s" : ""}...
					</div>
				)}
			</div>
		</div>
	);
}