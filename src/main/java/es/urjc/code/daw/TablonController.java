package es.urjc.code.daw;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class TablonController {

	@Autowired
	private AnuncioRepository repository;
	
    public TablonController() {}
	
	@PostConstruct
	public void init() {
		repository.save(new Anuncio("Pepe", "Hola"));
		repository.save(new Anuncio("Juan", "Adios"));
	}

	@GetMapping("/")
	public String tablon(Model model) {

		model.addAttribute("anuncios", repository.findAll());

		return "index";
	}
	
	@DeleteMapping("/anuncio/{num}")
	public String deleteOrder(Model model, @PathVariable long num) {
		repository.deleteById(num);
		model.addAttribute("anuncios", repository.findAll());

		return "index";
	}
	
	@PostMapping("/anuncio/nuevo")
	public String nuevoAnuncio(Model model, Anuncio anuncio) {
		repository.save(anuncio);

		return "order_saved";
	}

	@GetMapping("/anuncio/{num}")
	public String verAnuncio(Model model, @PathVariable long num) {
	
		model.addAttribute("nombre", repository.findById(num).get().getNombre());
		model.addAttribute("asunto", repository.findById(num).get().getAsunto());

		model.addAttribute("num", num);

		return "show_order";
	}
}