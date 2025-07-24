package project.employeecreator;

import java.util.Map;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/openai")
@CrossOrigin("*")
public class AIController {

    private OpenAiChatModel chatModel;

     // Simple FAQ map
    private static final Map<String, String> FAQS = Map.of(
        "company policies", "Our company policies include a Code of Conduct; PTO up to 20 days; tuition reimbursement; and more. See the employee handbook for full details.",
        "employee benefits", "We offer health insurance, dental, vision, 401(k) matching, stock options, wellness stipend, and flexible work hours.",
        "contact hr", "You can contact HR at hr@nology.io or call +1‑234‑567‑890 between 9 AM and 5 PM, Mon–Fri."
    );
    
    public AIController(OpenAiChatModel chatModel) {
        this.chatModel = chatModel;
    }

    @GetMapping("/{message}")
    public ResponseEntity<String> getAnswer(@PathVariable String message) {

        String key = message.trim().toLowerCase();
        if (FAQS.containsKey(key)) {
            // Return predefined FAQ answer
            return ResponseEntity.ok(FAQS.get(key));
        }
        // Fallback to LLM for other queries
        String response = chatModel.call(message);
        return ResponseEntity.ok(response);
    }
}
