package es.urjc.code.daw;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class TablonController {

	@Autowired
	private AnuncioRepository repository;
	
    public TablonController() {}
	
	@PostConstruct
	public void init() {
		String[] elementosAsunto = {"hola", "adios"};
		
		repository.save(new Anuncio("Pepe", elementosAsunto));
		repository.save(new Anuncio("Juan", elementosAsunto));
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
	
	@RequestMapping("/anuncio/nuevo")
	public String nuevoAnuncio(Model model, @RequestParam String nombre, @RequestParam("asunto[]") String[] asunto) {
		Anuncio anuncio = new Anuncio(nombre, asunto);
		repository.save(anuncio);

		return "order_saved";
	}
	
	@GetMapping("/editOrder/{num}")
	public String editAnuncio(Model model, @PathVariable long num, @RequestParam String nombre, @RequestParam("asunto[]") String[] asunto) {

		model.addAttribute("nombre", nombre);
		model.addAttribute("asunto", asunto);
		model.addAttribute("num", num);

		return "edit_order";
	}
	
	@RequestMapping("/saveOrder/{num}")
	public String saveAnuncio(Model model, @PathVariable long num, @RequestParam String nombre, @RequestParam("asunto[]") String[] asunto, @RequestParam("checked[]") String[] checked) {
		Anuncio anuncio = repository.findById(num).get();
		anuncio.setAsunto(asunto);
		anuncio.setNombre(nombre);
		anuncio.setIsChecked(checked);
		repository.save(anuncio);
		
		model.addAttribute("nombre" , nombre);
		model.addAttribute("asunto", asunto);
		model.addAttribute("num", num);
		model.addAttribute("checked", checked);

		return "order_saved";
	}

	@GetMapping("/anuncio/{num}")
	public String verAnuncio(Model model, @PathVariable long num) {
	
		model.addAttribute("nombre", repository.findById(num).get().getNombre());
		model.addAttribute("asunto", repository.findById(num).get().getAsunto());
		model.addAttribute("num", repository.findById(num).get().getId());
		model.addAttribute("checked", repository.findById(num).get().getIsChecked());

		return "show_order";
	}
}