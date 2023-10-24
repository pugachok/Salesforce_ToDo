/**
 * Created by Michael Pugach on 24/10/2023.
 */

@IsTest
private class ToDoControllerTest {
	private static final Integer NUMBER_OF_RECORDS = 50;

	@TestSetup
	static void setup() {
		List<ToDo__c> todoList = new List<ToDo__c>();
		for (Integer i = 0; i < NUMBER_OF_RECORDS; i++) {
			todoList.add(new ToDo__c(
				Title__c = 'Task ' + i,
				Due_Date__c = Date.today().addDays(i)
			));
		}

		insert todoList;
	}

	@IsTest
	static void saveToDo_PositiveTest() {
		String result = ToDoController.saveToDo('Test', Date.today());
		System.assertEquals(result, 'Success');
	}

	@IsTest
	static void saveToDo_NegativeTest() {
		try{
			ToDoController.saveToDo('Test', null);
		} catch(AuraHandledException e) {
			Assert.isNotNull(e);
		}
	}

	@IsTest
	static void getToDoListTest() {
		List<ToDo__c> todoList = ToDoController.getToDoList('Pending');
		Assert.areEqual(NUMBER_OF_RECORDS, todoList.size());
	}

	@IsTest
	static void updateToDo_PositiveTest() {
		ToDo__c todo = [
			SELECT Status__c
			FROM ToDo__c
			LIMIT 1
		];

		String result = ToDoController.updateToDo(todo.Id);

		Assert.areEqual(result, 'Success');

		todo = [
			SELECT Status__c
			FROM ToDo__c
			LIMIT 1
		];

		Assert.areEqual(todo.Status__c, 'Completed');
	}

	@IsTest
	static void updateToDo_NegativeTest() {
		try{
			ToDoController.updateToDo(null);
		} catch(AuraHandledException e) {
			Assert.isNotNull(e);
		}
	}

}