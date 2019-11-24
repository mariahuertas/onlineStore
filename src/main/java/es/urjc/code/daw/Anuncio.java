package es.urjc.code.daw;

public class Anuncio {

	private String nombre;
	private String asunto;

	public Anuncio() {

	}

	public Anuncio(String nombre, String asunto) {
		super();
		this.nombre = nombre;
		this.asunto = asunto;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getAsunto() {
		return asunto;
	}

	public void setAsunto(String asunto) {
		this.asunto = asunto;
	}


	@Override
	public String toString() {
		return "Anuncio [nombre=" + nombre + ", asunto=" + asunto + "]";
	}

}
