/**
 * Tables follow syntax:
 * - CREATE TABLE <tableName>(<columnName> <dataType> <options>, <columnName> <dataType>, <options> ...);
 * 
 */

exports.CREATE_SOCIAL_MEDIA_ACCOUNTS_TABLE = `CREATE TABLE IF NOT EXISTS social_media_accounts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    platform VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL
  )`;

// Get all 
exports.getAllSocialMediaAccounts = 'SELECT * FROM social_media_accounts';

// Get by id
exports.getSocialMediaAccountById = 'SELECT * FROM social_media_accounts WHERE id = ?';

// Get by username
exports.getSocialMediaAccountByUsername = 'SELECT * FROM social_media_accounts WHERE username = ?';

// Create a new social media account in 'social_media_accounts' table where column names match the order they are defined in the table
exports.createSocialMediaAccount = 'INSERT INTO social_media_accounts (platform, username, url) VALUES (?, ?, ?)';

// Update a social media account in 'social_media_accounts' table where column names match the order they are defined in the table
exports.updateSocialMediaAccount = 'UPDATE social_media_accounts SET platform = ?, username = ?, url = ? WHERE id = ?';

// Delete a social media account by id
exports.deleteSocialMediaAccount = 'DELETE FROM social_media_accounts WHERE id = ?';



