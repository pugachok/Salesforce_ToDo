/**
 * Created by Michael Pugach on 23/10/2023.
 */

public class ToDoController {

	@AuraEnabled
	public static String saveToDo(String title, Date dueDate) {
		try {
			insert new ToDo__c(
				Title__c = title,
				Due_Date__c = dueDate
			);

			return 'Success';
		} catch (Exception e) {
			throw new AuraHandledException(e.getMessage());
		}
	}

	@AuraEnabled(Cacheable=true)
	public static List<ToDo__c> getToDoList(String taskStatus) {
		return [
			SELECT Title__c, Due_Date__c
			FROM ToDo__c
			WHERE Status__c = :taskStatus
			ORDER BY Due_Date__c
		];
	}

	@AuraEnabled
	public static String updateToDo(Id toDoId) {
		try {
			ToDo__c toDo = [
				SELECT Status__c
				FROM ToDo__c
				WHERE Id = :toDoId
			];

			toDo.Status__c = 'Completed';
			update toDo;

			return 'Success';
		} catch (Exception e) {
			throw new AuraHandledException(e.getMessage());
		}
	}
}