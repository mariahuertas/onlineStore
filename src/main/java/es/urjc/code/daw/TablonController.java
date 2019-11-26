package es.urjc.code.daw;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class TablonController {

	private List<Anuncio> anuncios = new ArrayList<>();

	public TablonController() {
		anuncios.add(new Anuncio("Pepe", "Hola caracola"));
		anuncios.add(new Anuncio("Juan", "Hola caracola"));
	}

	@GetMapping("/")
	public String tablon(Model model) {

		model.addAttribute("anuncios", anuncios);

		return "index";
	}
	
	@DeleteMapping("/anuncio/{num}")
	public String deleteOrder(Model model, @PathVariable int num) {
		
		anuncios.remove(num-1);
		model.addAttribute("anuncios", anuncios);

		return "index";
	}
	
	@PostMapping("/anuncio/nuevo")
	public String nuevoAnuncio(Model model, Anuncio anuncio) {

		anuncios.add(anuncio);

		return "order_saved";
	}

	@GetMapping("/anuncio/{num}")
	public String verAnuncio(Model model, @PathVariable int num) {

		Anuncio anuncio = anuncios.get(num - 1);

		model.addAttribute("anuncio", anuncio);
		model.addAttribute("num", num);

		return "show_order";
	}
}